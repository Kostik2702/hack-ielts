import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';

import Button from '../../../components/button';
import Input from '../../../components/input/Input';

class NewWordForm extends PureComponent {
  generateInput = props => (
    <Input
      value={props.input.value}
      placeholder="Find word"
      onChange={v => props.input.onChange(v)}
    />
  );

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
            component={this.generateInput}
          />
        </div>
        <div className="NewWord__input">
          { !pristine && (
            <Button type="submit" label="Add" />
          ) }
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newWord',
})(NewWordForm);
