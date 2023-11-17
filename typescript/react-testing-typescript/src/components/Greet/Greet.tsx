interface Props {
  name?: string;
}

function greet({ name }: Props) {
  return <div>Hello {name}</div>;
}
export default greet;
