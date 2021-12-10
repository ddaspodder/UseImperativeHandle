import {
  useRef,
  forwardRef,
  useEffect,
  Component,
  useState,
  useImperativeHandle
} from "react";
import "./styles.css";

function Parent() {
  const parentRef = useRef(null);
  const [val, setVal] = useState("");
  return (
    <div>
      <h2>Parent</h2>
      {/* <div>
        <ChildWithFwdRef ref={parentRef} />
      </div> */}
      {/* <div>
        <ChildClass ref={parentRef} />
      </div> */}
      <div>
        <ChildImperativeHandleWithFwdRef ref={parentRef} />
      </div>
      <button onClick={() => setVal(parentRef.current.childRef.current.value)}>
        Copy!!
      </button>
      <div>{val ? val : ""}</div>
    </div>
  );
}

function Child({ fwdRef, ...other }) {
  return <input ref={fwdRef} />;
}

function ChildImperativeHandle({ fwdRef, ...other }) {
  const childRef = useRef(null);
  useImperativeHandle(fwdRef, () => ({
    childRef: childRef
  }));
  return <input ref={childRef} />;
}

class ChildClass extends Component {
  render() {
    return <input ref={this.props.fwdRef} />;
  }
}

const ChildWithFwdRef = forwardRef((props, ref) => (
  <Child {...props} fwdRef={ref} />
));

const ChildImperativeHandleWithFwdRef = forwardRef((props, ref) => (
  <ChildImperativeHandle {...props} fwdRef={ref} />
));

export default function App() {
  return (
    <div className="App">
      <Parent />
    </div>
  );
}
