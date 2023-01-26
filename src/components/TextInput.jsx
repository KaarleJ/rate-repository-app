import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, error, ...props }) => {
  const fieldStyle = error ? { ...style, borderColor: '#d73a4a'} : style
  const textInputStyle = [fieldStyle];

  return <NativeTextInput style={textInputStyle} {...props}/>;
};

export default TextInput;