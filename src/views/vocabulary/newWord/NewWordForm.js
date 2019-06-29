import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';

class NewWordForm extends PureComponent {
  render() {
    const { pristine, handleSubmit, onSubmit } = this.props;

    return (
      <form
        className={cn('NewWord__form', this.props.className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="NewWord__input">
          <Field
            name="word"
            component="input"
            type="text"
            placeholder="Find"
          />
        </div>
        <div className="NewWord__input">
          { !pristine && (
            <button type="submit">
              Submit
            </button>
          ) }
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newWord',
})(NewWordForm);
