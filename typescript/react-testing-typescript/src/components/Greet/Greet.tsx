interface Props {
  children?: React.ReactNode;
  name?: string;
}

function greet({ name }: Props) {
  return <div>Hello {name}</div>;
}
export default greet;
