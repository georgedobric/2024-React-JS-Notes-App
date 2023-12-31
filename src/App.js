import logo from "./logo.svg";
// import "./App.css";
import "./components/Node.js";
import "./index.css";
import React, { useState, useEffect } from "react";
import Node from "./components/Node";
import Job from "./components/Job";
import "./output.css";
import { motion } from "framer-motion";
/************************************   Author   *********************************************
 * Created by: George Dobric                                                                 *
/**********************************   Description   ******************************************
 * The intention of this application is to create a simple yet effective project management  *
 * tool. The two components which make up this program are Job and Node. User projects can   *
 * be added under 'Jobs' and project tasks can be entered under 'Nodes.' Each node contains  *
 * the following user-entered data: Objective, Planning, Collaboration, Communication, and   *
 * Risk Management. By compartmentalizing these key aspects of project management to each    *
 * minute project task, powerful insights can be collected. Moreover, the user can 'step'    *
 * up or down from nodes, creating embedded nodes and establishing hierarchies. This creates *
 * a clear map of the project which is easy to navigate, from its highest conceptual levels  *
 * to its lowest technical levels.                                                           *
 ********************************************************************************************/
function App() {
  const [Jobs, setJobs] = useState([
    {
      id: 1,
      title: "My Project",
      tree: [
        {
          nodeID: [1, 1],
          hierarchy: [1],
          subject: "Notes App",
          objective: "",
          plan: "",
          communication: "",
          collaboration: "",
          risk: "",
        },
      ],
    },
  ]);
  const [SelectedJob, setSelectedJob] = useState(0);
  let [SelectedNode, setSelectedNode] = useState([1, 1]);
  const [Hierarchy, setHierarchy] = useState([1]);
  const [JobSelectStatus, setJobSelectStatus] = useState(false);
  const [NoJobSelection, setNoJobSelection] = useState(true);
  const [stepDownAfterNodeSelect, setStepDownAfterNodeSelect] = useState(false);
  // const [clearNodeInputFields, setClearNodeInputFields] = useState(false)
  const [clearDisplayedAncestors, setClearDisplayedAncestors] = useState(false);
  const [newFoundObject, setNewFoundObject] = useState(Jobs[0].tree[0]);

  //Store the user's selected job.
  const JobSelector = (id) => {
    setSelectedJob(id);
    setJobSelectStatus(true);
    setNoJobSelection(false);
    // setClearNodeInputFields(true);
    setClearDisplayedAncestors(true);
    const newObj = Jobs[SelectedJob].tree[0];
    setNewFoundObject(newObj);
    console.log("The selected job is: ", SelectedJob);
    setSelectedNode([1,1]);
    setHierarchy([1]);
  };

  const clearDisplayedAncestorsHandler = () => {
    setClearDisplayedAncestors(false);
  }

  //Add new jobs entered by the user.
  const JobModifier = (obj) => {
    const updatedJob = [...Jobs, obj];
    setJobs(updatedJob);
  };

  const JobTitleModifier = (obj) => {
    // const updatedJob = Jobs[SelectedJob];
    // updatedJob.title = obj;
    Jobs[SelectedJob].title = obj;
  }

  const handleStepDownAfterNodeSelect = (state) => {
    setStepDownAfterNodeSelect(state);
  };

  //Store the user's selected node, passing the node's nodeID.
  const NodeSelector = (id) => {
    let updatedNodeSelect = id;
    setSelectedNode(updatedNodeSelect);
    return SelectedNode;
  };

  //Add new nodes entered by the user to the current job.
  const NodeModifier = (obj) => {
    const updatedTree = [...Jobs[SelectedJob].tree, obj];
    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedTree;
    setJobs(updatedJobs);
  };

  //Node input update functions, called by handlers in the Node component.
  const NodeObjectiveModifier = (event) => {
    //store the index of the selected node, using nodeID comparisons
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );

    //Use the spread operator and slice functionality to duplicate
    //Jobs array under a selected job, and alter the selected node's
    //objective field value.
    const updatedNodeObjective = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        objective: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    //duplicate the Jobs array using a spread operator
    const updatedJobs = [...Jobs];

    //modify the duplicate with the updated node objective value
    updatedJobs[SelectedJob].tree = updatedNodeObjective;

    //update JobSelectStatus
    setJobSelectStatus(updatedJobs);
  };

  const NodePlanModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        plan: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  };

  const NodeCollaborationModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        collaboration: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  };

  const NodeCommunicationModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        communication: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  };

  const NodeRiskModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedNodePlan = [
      ...Jobs[SelectedJob].tree.slice(0, index),
      {
        ...Jobs[SelectedJob].tree[index],
        risk: event,
      },
      ...Jobs[SelectedJob].tree.slice(index + 1),
    ];

    const updatedJobs = [...Jobs];
    updatedJobs[SelectedJob].tree = updatedNodePlan;
    setJobSelectStatus(updatedJobs);
  };

  const NodeIDModifier = (event) => {
    const index = Jobs[SelectedJob].tree.findIndex(
      (node) =>
        node.nodeID.length === SelectedNode.length &&
        node.nodeID.every((nodeID, index) => nodeID === SelectedNode[index])
    );
    const updatedJobs = [...Jobs];

    updatedJobs[SelectedJob].tree[SelectedNode].nodeID = event;
    setJobs(updatedJobs);
  };

  //Store the user's current heirarchy, used for filtering the displayed nodes,
  //  determined by the currently selected node's nodeID array minus its last element.
  const HierarchySetter = (newHierarchy) => {
    setHierarchy(newHierarchy);
  };

  const [InfoPreviewStatus, setInfoPreviewStatus] = useState(false);
  const infoPreviewHandler = (status) => {
    setInfoPreviewStatus(status);
  };

  //Input handlers
  const [userInput, setUserInput] = useState("");
  const handleSearch = (event) => {
    setUserInput(event.target.value);
  };

  //Shift the NodeID values accordingly upon a drag-and-drop action
  const dragDropShifter = (landingID, dragID) => {
    console.log("LANDING: " + landingID + " & DRAG " + dragID);
    console.log(Jobs.map);
    if (landingID !== dragID){
      const x = targetObject(landingID, dragID)
      console.log("x nodeID / landingID: " + x.nodeID);
    }
  };

  const targetObject = (landingID, dragID) => {

    //store the landing node object
    const objLandingNode = Jobs[SelectedJob].tree.find(
      (obj) =>
        obj.nodeID.length === landingID.length &&
        obj.nodeID.every(
          (nodeID, index) => nodeID === landingID[index]
        )
    );

    //store the landing node index
    const indexOfLandingNode = Jobs[SelectedJob].tree.findIndex(
      (obj) =>
        obj.nodeID.length === landingID.length &&
        obj.nodeID.every(
          (nodeID, index) => nodeID === landingID[index]
        )
    );

    //store the drag node object
    const objDraggedNode = Jobs[SelectedJob].tree.find(
      (obj) =>
        obj.nodeID.length === dragID.length &&
        obj.nodeID.every(
          (nodeID, index) => nodeID === dragID[index]
        )
    );

    //store the drag node index
    const indexOfDraggedNode = Jobs[SelectedJob].tree.findIndex(
      (obj) =>
        obj.nodeID.length === dragID.length &&
        obj.nodeID.every(
          (nodeID, index) => nodeID === dragID[index]
        )
    );

    // console.log("THE DRAG INDEX IS: " + indexOfDraggedNode.nodeID);
    // console.log("THE DRAG SUBJECT IS: " + indexOfDraggedNode.subject);

    //assign the new nodeID for the dragged node
    // const newNodeID = indexOfLandingNode.nodeID;
    //^for the above, I need to check the LENGTH of the amount of CHILD NODES
    //which are in the LANDING node

    //lets say we drag 1,2 into 1,1
    //so, the new hierarchy for the dragged node is = idnexOfLandingNode.nodeID
    //so, newNodeID = [newHierarchy, indexOfLandingNode.tree.length + 1]
    // nodeID reassignment
    // const newHierarchy = landingID;
    // let nodePositionInTree = 0;
    // if (objLandingNode.tree !== undefined) {
    //   nodePositionInTree = objLandingNode.tree.length + 1;
    // } else {
    //   nodePositionInTree = 1;
    // }
    // const newNodeID = [...newHierarchy, nodePositionInTree];
    // console.log("-----The NEW node ID issssss: " + newNodeID);

    //iterating nodeID reassignments
    // const nodeIDList = Jobs[SelectedJob].tree.map((ID, index) => (

    // ));

    //all dragged nodeIDs to be changed
    const nodeIDListDrag = Object.entries(Jobs[SelectedJob].tree)
          .filter(([key, value]) => value.nodeID && value.nodeID.toString().startsWith(objDraggedNode.nodeID.toString()))
          // .filter(([key, value]) => value.nodeID.toString().startsWith(objDraggedNode.nodeID.toString()))

          // .map(([key, value]) => value.nodeID); //nodeIndex(value.nodeID));
          .map(([key, value]) => ({ ...value, nodeIndex: nodeIndex(value.nodeID) })); //nodeIndex(value.nodeID));
    console.log(nodeIDListDrag);

    //all landing ndoeIDs, used for nodeID reassignment
    const nodeIDListLand = [];
    nodeIDListLand.push(objLandingNode);
    nodeIDListDrag.map (obj => (
      nodeIDListLand.push(obj))
    );
    console.log(nodeIDListLand);
    // ^two problems with the above code, should be .map for all but the last element
    // also, it should be done in a way where we store the NEW nodeID after its been adjusted, since these won't exist

    //for loop iteration to reassign all child node nodeIDs of the dragged node
    let newHierarchy = landingID;
    let dragIndex = 0;
    let firstNodeID = []; 
    nodeIDListDrag.map (obj => {

    
    
    let nodePositionInTree = 0;
    //looks like I need to implement the targetHierarchy logic here, then use hierarchyLength + 1
    //hierarchyLengthCounter(targetHierarchy) first to set up the value.
    // const hierarchyLength = hierarchyLengthCounter(obj.hierarchy);
    const hierarchyLength = hierarchyLengthCounter(nodeIDListLand[dragIndex].nodeID);
    if (hierarchyLength !== undefined) {
      nodePositionInTree = hierarchyLength + 1;
    } else {
      nodePositionInTree = 1;
    }
    const newNodeID = [...newHierarchy, nodePositionInTree];
    
    if (firstNodeID.length < 1)
    firstNodeID = [...newHierarchy, nodePositionInTree];
    console.log("-----The NEW node ID issssss: " + newNodeID);

    //update the nodeID for the dragged node
    let updatedDraggedNodeID = [];
    if (firstNodeID.length == nodeIDListLand[dragIndex].nodeID.length + 1) {
      updatedDraggedNodeID = [
        ...Jobs[SelectedJob].tree.slice(0, nodeIDListDrag[dragIndex].nodeIndex),
        {
          ...Jobs[SelectedJob].tree[nodeIDListDrag[dragIndex].nodeIndex],
          hierarchy: newNodeID.slice(0,newNodeID.length -1),//landingID,
          nodeID: newNodeID//indexOfLandingNode.nodeID,
          // hierarchy: firstNodeID.concat(nodeIDListLand[dragIndex].nodeID.slice(2, nodeIDListLand[dragIndex].nodeID.length - 1)),
          // nodeID: firstNodeID.concat(nodeIDListLand[dragIndex].nodeID.slice(2, nodeIDListLand[dragIndex].nodeID.length))
        },
        ...Jobs[SelectedJob].tree.slice(nodeIDListDrag[dragIndex].nodeIndex + 1),
      ];
  }
  else {
    updatedDraggedNodeID = [
      ...Jobs[SelectedJob].tree.slice(0, nodeIDListDrag[dragIndex].nodeIndex),
      {
        ...Jobs[SelectedJob].tree[nodeIDListDrag[dragIndex].nodeIndex],
        // hierarchy: newNodeID.slice(0,newNodeID.length -1),//landingID,
        // nodeID: newNodeID//indexOfLandingNode.nodeID,
        hierarchy: firstNodeID.concat(nodeIDListLand[dragIndex + 1].nodeID.slice(2, nodeIDListLand[dragIndex + 1].nodeID.length - 1)),
        nodeID: firstNodeID.concat(nodeIDListLand[dragIndex + 1].nodeID.slice(2, nodeIDListLand[dragIndex + 1].nodeID.length))
      },
      ...Jobs[SelectedJob].tree.slice(nodeIDListDrag[dragIndex].nodeIndex + 1),
    ];
  }
    newHierarchy = newNodeID;
    dragIndex++;
    nodeIDListLand[dragIndex].nodeID = newNodeID;
    //check if the next node being reassigned will go in the same hierarchy, or a new one
    // if (nodeIDListLand[dragIndex].nodeID.length == nodeIDListLand[dragIndex + 1].nodeID.length + 1)
    // dragIndex--;

    //^the logic above is faulty and would be inconsistent if it worked.
    
    console.log("completed.")

    

    //duplicate the Jobs array using a spread operator
    const updatedJobs = [...Jobs];

    //modify the duplicate with the updated node's nodeID value
    updatedJobs[SelectedJob].tree = updatedDraggedNodeID;

    //update Jobs
    setJobs(updatedJobs);

    });
    return(indexOfLandingNode);
  };

  const nodeIndex = (ID) => {
    const index = Jobs[SelectedJob].tree.findIndex(
    (obj) =>
      obj.nodeID.length === ID.length &&
      obj.nodeID.every(
        (nodeID, index) => nodeID === ID[index]
      )
    );
    return (index);
  };

  //Count the hierarcy length, used to assign new nodeIDs when dragging and dropping
  const hierarchyLengthCounter = (targetHierarchy) => {
    let count = 0;
    Jobs[SelectedJob].tree.forEach((node) => {
      const nodeHierarchy = node.nodeID.slice(0, -1); // Extract all but the last element
      if (JSON.stringify(nodeHierarchy) === JSON.stringify(targetHierarchy)) {
        count++;
      }
    });

    return count;
  };

  return (
    <div>
      {/* <input
        type="Search"
        value={userInput}
        onChange={handleSearch}
        class="bg-green-300 text-black bold mx-auto rounded-full border-4 border-black ml-56 w-1/2 text-center"
        placeholder="Search through your jobs and nodes..."
      /> */}
      {/* <br></br> */}
      <div>
        <Job
          jobs={Jobs}
          JobSelector={JobSelector}
          SelectedJob={SelectedJob}
          JobSelectStatus={JobSelectStatus}
          NoJobSelection={NoJobSelection}
          JobModifier={JobModifier}
          JobTitleModifier={JobTitleModifier}
        ></Job>
      </div>


      <br></br>
      <div class="h-full">
        <Node
          class="z-0"
          jobs={Jobs}
          SelectedJob={SelectedJob}
          JobSelectStatus={JobSelectStatus}
          NodeModifier={NodeModifier}
          SelectedNode={SelectedNode}
          NodeSelector={NodeSelector}
          NodeObjectiveModifier={NodeObjectiveModifier}
          NodePlanModifier={NodePlanModifier}
          NodeCollaborationModifier={NodeCollaborationModifier}
          NodeCommunicationModifier={NodeCommunicationModifier}
          NodeRiskModifier={NodeRiskModifier}
          NodeIDModifier={NodeIDModifier}
          Hierarchy={Hierarchy}
          HierarchySetter={HierarchySetter}
          stepDownAfterNodeSelect={stepDownAfterNodeSelect}
          handleStepDownAfterNodeSelect={handleStepDownAfterNodeSelect}
          clearDisplayedAncestors={clearDisplayedAncestors}
          clearDisplayedAncestorsHandler={clearDisplayedAncestorsHandler}
          newFoundObject={newFoundObject}
          dragDropShifter={dragDropShifter}
        ></Node>
      </div>

    
    </div>
  );
}

export default App;