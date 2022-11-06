import TextArea from '../styles/TextArea';

function VariableHeightTextInput({ text, setText, ...props }) {
  function handleChange(event) {
    const element = event.target;
    setText(element.value);
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }

  return <TextArea value={text} onChange={handleChange} rows="1" {...props} />;
}

export default VariableHeightTextInput;
