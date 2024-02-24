import React from "react";
import ToolsAreaItem from "./ToolsAreaItem";

const ToolsArea = () => {
  const tools = [
    {
      src: "/img/icon/tools_icon01.png",
      title: "Photoshop",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/tools_icon02.png",
      title: "Illustrator",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/tools_icon03.png",
      title: "Figma",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/tools_icon04.png",
      title: "Sketch",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/tools_icon05.png",
      title: "Premeire Pro",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/tools_icon06.png",
      title: "After Effects",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/tools_icon07.png",
      title: "HTML 5",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
    {
      src: "/img/icon/tools_icon08.png",
      title: "Blender",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    },
  ];

  return (
    <section className="tools-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-title title-style-two white-title text-center mb-50">
              <span className="sub-title">My Tools</span>
              <h2 className="title">What Tools I Use</h2>
            </div>
          </div>
        </div>

        <div className="tools-item-wrap">
          <div className="row justify-content-center">
            {tools.map((x, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                <ToolsAreaItem item={x} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsArea;
