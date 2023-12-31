import React, { useState, useEffect, useRef } from "react";
// import "./Job.css";
import "../App.js";
// import "../output.css"
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { motion } from "framer-motion";

function Job(props) {
  //Store the user's selected job.
  const handleJobSelect = (id) => {
    props.JobSelector(id);
  };

  //Styling
  const [addJobClickStatus, setAddJobClickStatus] = useState();


  //Let the user  add a new job.
  const handleAddJob = () => {
    const newJob = {
      id: props.jobs.length + 1,
      title: prompt("Enter a job title"),
      tree: [
        {
          nodeID: [1, 1],
          hierarchy: [1],
          subject: "Root",
          objective: "",
          plan: "",
          communication: "",
          collaboration: "",
          risk: "",
        },
      ],
    };
    props.JobModifier(newJob);
  };

  //Let the user  add a new job.
  const handleEditJob = () => {
    const newTitle = prompt("Enter a new job title:")
    props.JobTitleModifier(newTitle);
  };

  // const handleAddJobClick = () => {
  // setAddJobClickStatus(true);
  //   setTimeout(() => {
  //     handleAddJob();
  //     setAddJobClickStatus(false);
  //   }, 200);
  // }
  const addJobButtonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: '#9370DB',
      transition: {
        duration: 0.01,
      },
    },
    tap: {
      scale: 0.9,
      backgroundColor: '#9932CC',
      transition: {
        duration: 0.1,
      },
    },
  };

  const editJobButtonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: '#9370DB',
      transition: {
        duration: 0.01,
      },
    },
    tap: {
      scale: 0.9,
      backgroundColor: '#9932CC',
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div className="relative w-full">
      <motion.button
          variants={addJobButtonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="text-xs bg-red-500 z-10 p-1  rounded-lg border-4 border-black absolute top-1/8 right-1/4 transform transition-transform duration-300 hover:scale-90"
          onClick={handleAddJob}

        >
          ➕
        </motion.button>

<div className="absolute right-1/4">
        <motion.button
        //   variants={editJobButtonVariants}
        //   initial="rest"
        //   whileHover="hover"
        //   whileTap="tap"
          className="text-xs bg-red-500 z-10 p-1 w-1/8 rounded-full border-4 border-black absolute top-1/8  transform transition-transform duration-300 hover:scale-90"
        //   className="bg-green-300 relative left-1/2 border-white"
          onClick={handleEditJob}
        >
        edit title
        </motion.button>
        </div>

      <div
        class="bg-gray-700 border-4 border-blue-300 rounded-xl fixed h-1/8 w-1/2 left-1/4 "
        onClick={getMouseEventOptions}
      >
        {props.jobs.map((obj) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            class="text-white text-center h-min whitespace-nowrap bg-blue-400 border-4 border-pink-300 p-3 rounded-full w-2/3 mx-auto mb-2 top-1  relative"
            key={obj.id}
            onClick={() => {
              handleJobSelect(obj.id - 1);
            }}
          >
            {obj.title}
          </motion.button>
        ))}
      </div>


      {props.JobSelectStatus && (
        <div class="bg-gray-300 rounded-full border-4 border-black p-1 fixed z-10">
          {/* Selected Map: {props.SelectedJob + 1} */}
          Selected Map: {props.jobs[props.SelectedJob].title}
        </div>
      )}


      {props.NoJobSelection && (
        <div class="bg-gray-300 fixed rounded-full p-1 border-4 border-black z-50">
          Please select a map...
        </div>
      )}
    </div>
  );
}

export default Job;
