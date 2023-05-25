import React from 'react';
import SortPopup from './SortPopup';
import { getData } from './Api';
import { filter, reverse, sortBy } from 'lodash';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [renderData, setRenderData] = React.useState([]);
  const [activeSortType, setActiveSortType] = React.useState('');
  const [isReversed, setIsReversed] = React.useState(false);

  const minOwnerReputation = 50;

  const sortItems = [
    { name: 'дата создания', type: 'creation_date' },
    { name: 'количество просмотров', type: 'view_count' },
    { name: 'рейтинг автора', type: 'owner.reputation' },
  ];

  const createMarkup = (text) => {
    return { __html: `${text}` };
  };

  const sort = (arr, sortfield) => {
    return sortBy(arr, sortfield);
  };

  React.useEffect(() => {
    if (isLoading) {
      getData()
        .then((res) => {
          const filteredData = filter(
            res.items,
            (elem) => elem.is_answered && elem.owner.reputation >= minOwnerReputation,
          );
          const sortByDate = sort(filteredData, 'creation_date');
          setActiveSortType(sortItems[0].type);
          setRenderData(sortByDate);
        })
        .catch((err) => {
          console.log('Ошибка:', err);
        })
        .finally(() => setIsLoading(false));
    } else {
      const newArr = isReversed
        ? reverse(sort(renderData, activeSortType))
        : sort(renderData, activeSortType);
      setRenderData(newArr);
    }
  }, [activeSortType, isReversed]);

  return (
    <div className={`posts ${isLoading ? 'posts__loading' : ''}`}>
      {isLoading ? (
        <h2 className="posts__loading-title">Loading...</h2>
      ) : (
        <>
          <SortPopup
            items={sortItems}
            activeSortType={activeSortType}
            onChangeSortType={setActiveSortType}
            isReversed={isReversed}
            setIsReversed={setIsReversed}
          />
          {renderData.map((item) => (
            <a
              target="_blank"
              rel="noreferrer"
              href={item.link}
              className="post"
              key={item.accepted_answer_id}>
              <img src={item.owner.profile_image} alt="" className="post__image" />
              <h2 className="post__title" dangerouslySetInnerHTML={createMarkup(item.title)}></h2>
            </a>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
