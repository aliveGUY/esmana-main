import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const Popup = forwardRef((props, ref) => {
  const { children, content } = props;
  const [opened, setOpened] = useState(false);
  const popupRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpened(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useImperativeHandle(ref, () => ({
    open: () => setOpened(true),
    close: () => setOpened(false),
    toggle: () => setOpened((prev) => !prev),
  }));

  return (
    <div className="popup-anchor" ref={popupRef}>
      {children}
      <div className={`popup ${opened ? "opened" : ""}`}>{content}</div>
    </div>
  );
});

export default React.memo(Popup);
