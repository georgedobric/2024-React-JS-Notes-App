import React, { useState, useEffect, useRef } from "react";
import "./Node.css";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { motion, useAnimation } from "framer-motion";

function Node(props) {
  const [Preview, setPreview] = useState(false);
  const [PreviewID, setPreviewID] = useState(0);
  const [ScrollingUp, setScrollingUp] = useState(false);
  const [ScrollingDown, setScrollingDown] = useState(false);
  const [previewObject, setPreviewObject] = useState(
    props.jobs[props.SelectedJob].tree[0]
  );
  const [addNodeClickStatus, setAddNodeClickStatus] = useState();
  const [dragNodeId, setDragNodeId] = useState();

  //Let the user preview nodes with a mouse hover.
  const handleMouseEnter = (id) => {
    setPreview(true);
    setPreviewID(id);
    const previewObjectSetter = props.jobs[props.SelectedJob].tree.find(
      (obj) =>
        obj.nodeID.length === id.length &&
        obj.nodeID.every((nodeID, index) => nodeID === id[index])
    );
    setPreviewObject(previewObjectSetter);
  };

  const handleMouseLeave = () => {
    setPreview(false);
    setScrollingDown(false);
    setScrollingUp(false);
  };

  //Count the hierarcy length, used to help for the nodeID of newly-added nodes.
  const hierarchyLengthCounter = (targetHierarchy) => {
    let count = 0;
    props.jobs[props.SelectedJob].tree.forEach((node) => {
      const nodeHierarchy = node.nodeID.slice(0, -1); // Extract all but the last element
      if (JSON.stringify(nodeHierarchy) === JSON.stringify(targetHierarchy)) {
        count++;
      }
    });

    return count;
  };

  const handleAddNodeClick = () => {
    setAddNodeClickStatus(true);
    setTimeout(() => {
      handleAddNode();
      setAddNodeClickStatus(false);
    }, 200);
  };
  //Add a new node to the selected job & selected hierarchy.
  const handleAddNode = (obj) => {
    const targetHierarchy = foundObject.nodeID.slice(0, -1);
    const hierarchyLength = hierarchyLengthCounter(targetHierarchy);

    const updatedHierarchy = [...props.Hierarchy, hierarchyLength + 1];
    const updatedNodeID = [...updatedHierarchy, targetHierarchy.length + 1];
    const newNode = {
      subject: obj,
      hierarchy: props.Hierarchy,
      nodeID: updatedHierarchy,
    };
    props.NodeModifier(newNode);
  };

  //Store the user's selected node by passing in the nodeID.
  const handleNodeSelect = (id) => {
    props.NodeSelector(id);
    // nodeInfoHierarchyDisplay(props.SelectedNode);
    nodeInfoHierarchyDisplay();
  };

  //Input Handlers:
  const [userInputObjective, setUserInputObjective] = useState("");
  const handleNodeObjective = (event) => {
    setUserInputObjective(event.target.value);
  };

  const [userInputPlan, setUserInputPlan] = useState("");
  const handleNodePlan = (event) => {
    setUserInputPlan(event.target.value);
  };

  const [userInputCollaboration, setUserInputCollaboration] = useState("");
  const handleNodeCollaboration = (event) => {
    setUserInputCollaboration(event.target.value);
  };

  const [userInputCommunication, setUserInputCommunication] = useState("");
  const handleNodeCommunication = (event) => {
    setUserInputCommunication(event.target.value);
  };

  const [userInputRisk, setUserInputRisk] = useState("");
  const handleNodeRisk = (event) => {
    setUserInputRisk(event.target.value);
  };

  function clearInput() {
    setUserInputObjective("");
    setUserInputPlan("");
    setUserInputCollaboration("");
    setUserInputCommunication("");
    setUserInputRisk("");
  }

  //Update Handlers:
  const handleObjectiveUpdate = (objective) => {
    props.NodeObjectiveModifier(objective);
  };

  const handlePlanUpdate = (objective) => {
    props.NodePlanModifier(objective);
  };

  const handleCollaborationUpdate = (objective) => {
    props.NodeCollaborationModifier(objective);
  };

  const handleCommunicationUpdate = (objective) => {
    props.NodeCommunicationModifier(objective);
  };

  const handleRiskUpdate = (objective) => {
    props.NodeRiskModifier(objective);
    clearInput();
  };

  //Called when the user scrolls up while previewing a node. Prompts the user to enter a child node.
  const handleAddNestedNode = () => {
    const newID = [...previewObject.nodeID, 1];
    props.HierarchySetter(previewObject.nodeID);
    const newHierarchy = [...previewObject.nodeID];
    const isNotNullStepDownCheck = props.jobs[props.SelectedJob].tree.filter(
      (obj) => obj.nodeID.join("") === newID.join("")
    );
    if (isNotNullStepDownCheck.length < 1) {
      const newNode = {
        subject: prompt("Enter a node subject"),
        hierarchy: newHierarchy,
        nodeID: newID,
      };
      props.NodeModifier(newNode);
      handleNodeSelect(newNode.nodeID);
    }
    handleNodeSelect(newID);
  };

  //Change the hierarchy value upon the user 'stepping' down or up form a parent node to a child node, or vice versa, respectively.
  async function handleHierarchyShift(
    nodePreview,
    scrollUpStatus,
    nodeID,
    scrollDownStatus
  ) {
    if (nodePreview == true && scrollUpStatus == true) {
      console.log("step down");
      handleNodeSelect(nodeID);
      handleAddNestedNode();
      if (nodePreview === true) {
        setPreview(false);
      }
    } else if (
      nodePreview == true &&
      scrollDownStatus == true &&
      props.Hierarchy.length > 1
    ) {
      console.log("step up");
      const StepUpHierarchy = props.Hierarchy.slice(0, -1);
      props.HierarchySetter(StepUpHierarchy);
      const stepUpDefaultNodeSelect = [...StepUpHierarchy, 1];
      props.NodeSelector(stepUpDefaultNodeSelect);
      updateFoundObject();
      if (nodePreview === true) {
        setPreview(false);
      }
    }
  }

  //Handle scroll logic.
  const handleScroll = (event) => {
    try {
      if (event.deltaY < 0) {
        setScrollingUp(true);
        setScrollingDown(false);
      } else if (event.deltaY === 0) {
        // setScrollingUp(false);
      } else if (event.deltaY > 0) {
        setScrollingDown(true);
        setScrollingUp(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  //Store the user-selected node, used for reference when adding new nodes.
  let [foundObject, setFoundObject] = useState(
    props.jobs[props.SelectedJob].tree[0]
  );

  //latest adjustment to logic, intended to resolve job switching when viewing a child node.
  //Appears to be an issue with props.Hierarchy being blank
  //Manually stepping up to the root then switching jobs works fine.
  if (props.clearDisplayedAncestors == true){
    foundObject = props.newFoundObject; //Update the foundObject upon the user selecting a different Job
    props.clearDisplayedAncestorsHandler();
  }
  useEffect(() => {
    const foundObjectSetter = props.jobs[props.SelectedJob].tree.find(
      (obj) =>
        obj.nodeID.length === props.SelectedNode.length &&
        obj.nodeID.every(
          (nodeID, index) => nodeID === props.SelectedNode[index]
        )
    );
    setFoundObject(foundObjectSetter);
    // props.clearDisplayedAncestorsHandler();
  }, [props.SelectedNode]); //, props.clearDisplayedAncestors]);

  const updateFoundObject = () => {
    const foundObjectSetter = props.jobs[props.SelectedJob].tree.find(
      (obj) =>
        obj.nodeID.length === props.SelectedNode.length &&
        obj.nodeID.every(
          (nodeID, index) => nodeID === props.SelectedNode[index]
        )
    );
    setFoundObject(foundObjectSetter);
  };

  //Filter through the user-selected job, storing elements that are in the user's current hierarchy. Used for displaying nodes.
  const displayedHierarchy = props.jobs[props.SelectedJob].tree.filter(
    (obj) => obj.hierarchy.join("") === props.Hierarchy.join("")
  );

  console.log("-----------------------");
  console.log(
    "========The current Hierarcy is:" + props.Hierarchy + "========"
  );

  //display the node hierarchy in node info
  //Filter through the user-selected job, storing elements that are parents of the user-selected node, including the selected node. Used for the nodeID display.
  const displayedAncestors =
    props.SelectedNode !== undefined
      ? [props.jobs[props.SelectedJob].tree[0]]
      : [props.jobs[0].tree[0]];
  // let ancestorID = displayedAncestors !== undefined ? displayedAncestors.nodeID : [1,1];
  
  // if (props.jobs[props.SelectedJob].tree[0].hierarchy.length == 1 && props.clearDisplayedAncestors == true) {
  //   updateFoundObject();
  //   props.clearDisplayedAncestorsHandler();
  // }
    if (props.jobs[props.SelectedJob].tree[0].hierarchy.length == 1 && props.clearDisplayedAncestors == true) {
    
    props.clearDisplayedAncestorsHandler();
  }
  let ancestorID =
    foundObject !== undefined && foundObject.hierarchy.length >= 2
      ? [...foundObject.hierarchy]
      : [1,1];
    // foundObject !== undefined && foundObject.hierarchy.length >= 2
    //   ? [...foundObject.hierarchy]
    //   : [1, 1];

  const nodeInfoHierarchyDisplay = () => {
    if (displayedAncestors.length == 1) {
      displayedAncestors.pop(); //Remove the 'Root' ancestor used to initialize displayedAncestors
    }
    do {
      displayedAncestors.push(
        props.jobs[props.SelectedJob].tree.find(
          (obj) => obj.nodeID.join("") === ancestorID.join("")
        )
      ); //Push the node, with a nodeID of ancestorID's, into displayedAncestors

      ancestorID.pop(); //Set the next ancestor's node ID
    } while (ancestorID.length >= 2);
  };
  nodeInfoHierarchyDisplay();

  // if (foundObject.hierarchy.length >= 2){
  //   nodeInfoHierarchyDisplay();
  // }
  // else if (foundObject.hierarchy.length == 2 && props.clearDisplayedAncestors == true) {
  //   displayedAncestors.length=0;
  //   setFoundObject(props.jobs[props.SelectedJob].tree[0]);
  //   props.clearDIsplayedAncestorsHandler();
  // }

  // useEffect(() => {
  //   if (props.clearDisplayedAncestors == true) {
  //     updateFoundObject();
  //   }
  //   props.clearDisplayedAncestorsHandler();
  // }, [props.clearDisplayedAncestors]);

  //Drag & drop hierarchy adjustments

  //Node subjected to hierarchy change
  const hanldeNodeDrag = (id) => {
    setDragNodeId(id);
  };

  //Destination parent node for the node being dragged, adding said node to its children
  const hanldeNodeLanding = (id) => {
    props.dragDropShifter(id, dragNodeId);
  };



  const [inputValue, setInputValue] = useState('• ');
  const [rows, setRows] = useState(1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setRows(rows + 1); // Increase the number of rows
      // Handle Enter key press (e.g., submit form, add new line, etc.)
    }
  };

  const isLineEmpty = (line) => {
    // Check if the line consists only of whitespace characters or is empty
    return /^[\s•]*$/.test(line);
  };

  const createNewNodes = (nodes) => {
    nodes.map((obj) => (
      handleAddNode(obj)
    ))
  }
  return (
    <div>
      <div class="h-full">

        <div
          class="z-50  bg-gray-800 border-4 border-blue-300 rounded-xl  h-4/6 w-full top-1/4 overflow-auto overflow-nowrap flex flex-col fixed"
          onClick={getMouseEventOptions}
        >
          {props.JobSelectStatus &&
            displayedHierarchy.map((obj) => (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={obj.id}
                className="text-white text-center h-min whitespace-nowrap bg-blue-400 border-4 border-pink-300 p-3 rounded-full w-2/3 mx-auto mb-2 top-1  relative"
                onMouseEnter={() => {
                  handleMouseEnter(obj.nodeID);
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                }}
                onClick={() => {
                  handleNodeSelect(obj.nodeID);
                }}
                onMouseDown={() => {
                  hanldeNodeDrag(obj.nodeID);
                }}
                onMouseUp={() => {
                  hanldeNodeLanding(obj.nodeID);
                }}
                onWheel={() => {
                  handleHierarchyShift(
                    Preview,
                    ScrollingUp,
                    PreviewID,
                    ScrollingDown
                  );
                }}
              >
                {obj.subject}
              </motion.button>
            ))}
            {props.JobSelectStatus &&
            <textarea
              // className="text-white text-center h-min whitespace-nowrap bg-blue-700 border-4 border-pink-300 p-3 rounded-full w-2/3 mx-auto mb-2 top-1  relative"
              // className="resize-none overflow-hidden h-auto min-h-1em w-full min-h-1em text-white text-center h-min whitespace-nowrap bg-blue-700 border-4 border-pink-300 p-3 rounded-full w-2/3 mx-auto mb-2 top-1  relative"
              className="resize-none overflow-hidden h-auto min-h-1em w-full min-h-1em"
              placeholder="Start typing bullet points..."
              rows={rows}
              value={inputValue}
              onChange={handleInputChange}
              // onKeyDown={handleKeyDown}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  let lines = inputValue.split('\n');
                  let newNodes = inputValue.split('\n• ');
                  let lastLine = lines[lines.length - 1];

                  if (isLineEmpty(lastLine)) {
                    newNodes.length--;
                    newNodes[0] = newNodes[0].replace('• ','');
                    createNewNodes(newNodes);
                    setInputValue('• ');
                    setRows(1);
                  } else {
                  setRows(rows + 1);
                  setInputValue((prevValue) => prevValue + '\n• ');
                }
                }
              }}
            >
            '• '
            </textarea>
            }           
        </div>
      </div>

    </div>
  );
}
export default Node;
