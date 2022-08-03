import * as React from 'react';

interface IProps {
  num: number;
}

class Children extends React.Component<IProps, object> {
  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate(nextProps, nextState) {
    console.log('子组件将要更新');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('子组件更新完');
  }

  render() {
    return <div>{this.props.num}</div>;
  }
}

export default Children;
