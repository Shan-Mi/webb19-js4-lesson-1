import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

import TodoItem from "../TodoItem";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Tests Task Item", () => {
  const payload = {
    id: 1,
    task: "This is a new task",
    priority: 1,
    isCompleted: false,
    dueDate: new Date(),
  };

  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  it("renders correctly", () => {
    const wrapper = shallow(<TodoItem todoItem={payload} />);
    // console.log(wrapper.debug());
    expect(wrapper.find("p").text()).toContain("This is a new task");
    // act(() => {
    //   render(<TodoItem todoItem={payload} />, container);
    // });
    // expect(container.textContent).toContain("This is a new task");
  });

  it("renders priority >= 50 correctly", () => {
    const wrapper = shallow(
      <TodoItem todoItem={{ ...payload, priority: 51 }} />
    );
    // console.log(wrapper.debug());
    expect(wrapper.find("p").text()).toContain("♥️");
    // act(() => {
    //   render(<TodoItem todoItem={{ ...payload, priority: 51 }} />, container);
    // });
    // expect(container.textContent).toContain("♥️");
  });

  it("renders 50 > priorioty > 10 correctly", () => {
    const wrapper = shallow(
      <TodoItem todoItem={{ ...payload, priority: 45 }} />
    );
    expect(wrapper.find("p").text()).toContain("⭐️");

    // act(() => {
    //   render(<TodoItem todoItem={{ ...payload, priority: 45 }} />, container);
    // });
    // expect(container.textContent).toContain("⭐️");
  });

  it("renders priorioty 10>= priority > 5", () => {
    const wrapper = shallow(
      <TodoItem todoItem={{ ...payload, priority: 7 }} />
    );
    expect(wrapper.find("p").text()).toContain("🔔");
    // act(() => {
    //   render(<TodoItem todoItem={{ ...payload, priority: 7 }} />, container);
    // });
    // expect(container.textContent).toContain("🔔");
  });

  it("renders late icon correctly", () => {
    const wrapper = shallow(
      <TodoItem todoItem={{ ...payload, dueDate: yesterday }} />
    );
    expect(wrapper.find("p").text()).toContain("⚠️");
    // act(() => {
    //   render(
    //     <TodoItem todoItem={{ ...payload, dueDate: yesterday }} />,
    //     container
    //   );
    // });
    // expect(container.textContent).toContain("⚠️");
  });

  it("does not render late icon", () => {
    const wrapper = shallow(
      <TodoItem todoItem={{ ...payload, dueDate: tomorrow }} />
    );
    expect(wrapper.find("p").text()).not.toContain("✅");

    // act(() => {
    //   render(
    //     <TodoItem todoItem={{ ...payload, dueDate: tomorrow }} />,
    //     container
    //   );
    // });
    // expect(container.textContent).not.toContain("✅");
  });

  it("renders isCompleted true correctly", () => {
    const wrapper = shallow(
      <TodoItem todoItem={{ ...payload, isCompleted: true }} />
    );
    expect(wrapper.find("p").text()).toContain("✅");

    // act(() => {
    //   render(
    //     <TodoItem todoItem={{ ...payload, isCompleted: true }} />,
    //     container
    //   );
    // });
    // expect(container.textContent).toContain("✅");
  });

  it("renders isCompleted false correctly", () => {
    const wrapper = shallow(
      <TodoItem todoItem={{ ...payload, isCompleted: false }} />
    );
    expect(wrapper.find("p").text()).toContain("☑️");

    // act(() => {
    //   render(
    //     <TodoItem todoItem={{ ...payload, isCompleted: false }} />,
    //     container
    //   );
    // });
    // expect(container.textContent).toContain("☑️");
  });
});
