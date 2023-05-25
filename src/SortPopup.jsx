import React from 'react';

const SortPopup = ({
  items,
  activeSortType,
  onChangeSortType,
  reverseSort,
  isReversed,
  setIsReversed,
}) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);

  const sortRef = React.useRef();
  const activeLabel = items.find((obj) => obj.type === activeSortType).name;

  const togleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const onSelectItem = (type) => {
    onChangeSortType(type);
    setVisiblePopup(false);
  };

  const handleOutsideClick = (e) => {
    if (!e.composedPath().includes(sortRef.current)) {
      setVisiblePopup(false);
    }
  };

  const handleArrowClick = () => {
    setIsReversed(!isReversed);
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <span
          className={`sort__arrow ${isReversed ? 'rotated' : ''}`}
          onClick={handleArrowClick}></span>
        <b className="sort__label-text">Сортировка по:</b>
        <span className="sort__label-text-colored" onClick={togleVisiblePopup}>
          {activeLabel}
        </span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul className="sort__popup-list">
            {items &&
              items.map((obj, index) => (
                <li
                  onClick={() => {
                    onSelectItem(obj.type);
                  }}
                  key={`${obj.type}_${index}`}
                  className={`sort__popup-list-item ${
                    activeSortType === obj.type ? 'active' : ''
                  }`}>
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortPopup;
