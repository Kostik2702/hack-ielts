import React, { PureComponent } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import Button from '../../components/button';
import { units } from './master.duck';

class MasterVocabularyComponent extends PureComponent {
  render() {
    const {
      actions, words, translation, answer, mistakes,
    } = this.props;

    return (
      <div className={cn('MasterVocabulary', this.props.className)}>
        <div className="MasterVocabulary__box">
          <Link to={`/master/${units.constructor}`}>
            <Button label="Constructor" />
          </Link>
        </div>
        <div className="MasterVocabulary__box">
          <Link to="/translation">
            <Button label="Word-translation" />
          </Link>
        </div>
        <div className="MasterVocabulary__box">
          <Button label="Listening" />
        </div>
        {/*
        <Constructor
          words={words}
          translation={translation}
          answer={answer}
          mistakes={mistakes}
          addLetter={actions.addLetter}
        />
        */}

      </div>
    );
  }
}

export default MasterVocabularyComponent;
