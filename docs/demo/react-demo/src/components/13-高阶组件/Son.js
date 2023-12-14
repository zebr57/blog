
function Son(props) {
  console.log('render Son');
  return (
    <div>
      <div>
        Son获取到的props.name:
        {props.name}
      </div>
      <div>
        x: {props.x},y: {props.y}
      </div>
    </div>
  );
}
export default Son;
