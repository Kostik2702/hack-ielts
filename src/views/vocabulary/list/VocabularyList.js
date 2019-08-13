import React, { PureComponent } from 'react';
import cn from 'classnames';
import { Column, Table, WindowScroller } from 'react-virtualized';
import deleteIco from '../../../assets/delete.svg';
import speakIco from '../../../assets/speak.svg';
import spinnerIco from '../../../assets/spinner.svg';

class VocabularyList extends PureComponent {
  render() {
    const {
      words, deleteWord, playAudio, loadingAudio,
    } = this.props;

    return (
      <div className={cn('VocabularyList', this.props.className)}>
        <WindowScroller>
          {({
            height, isScrolling, onChildScroll, scrollTop,
          }) => (
            <Table
              width={600}
              autoHeight
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              height={height}
              headerHeight={0}
              rowHeight={50}
              rowCount={words.length}
              rowGetter={({ index }) => words[index]}
            >
              <Column
                width={50}
                label="Play"
                dataKey="word"
                cellRenderer={props => (
                  <div
                    className="VocabularyList__audioBox"
                    role="button"
                    onClick={() => playAudio(
                      props.rowData.word,
                    )}
                  >
                    { loadingAudio === props.rowData.word
                      ? (
                        <img
                          className="VocabularyList__audioSpinner"
                          src={spinnerIco}
                          alt="loading"
                        />
                      )
                      : <img src={speakIco} alt="speak" />
                    }
                  </div>
                )}
              />
              <Column
                label="Word"
                dataKey="word"
                className="VocabularyList__word"
                width={200}
              />
              <Column
                width={200}
                label="Translation"
                dataKey="translation"
              />
              <Column
                width={100}
                label="Progress"
                dataKey="progress"
                cellRenderer={props => (
                  <div
                    className="VocabularyList__progressBox"
                  >
                    {`${props.rowData.progress || 0}%`}
                  </div>
                )}
              />
              <Column
                width={200}
                label="Delete"
                dataKey="id"
                cellRenderer={props => (
                  <div
                    className="VocabularyList__deleteBox"
                    role="button"
                    onClick={() => deleteWord(
                      props.rowData.id,
                    )}
                  >
                    <img
                      src={deleteIco}
                      alt="delete"
                    />
                  </div>
                )}
              />
            </Table>
          )}
        </WindowScroller>
      </div>
    );
  }
}

export default VocabularyList;
