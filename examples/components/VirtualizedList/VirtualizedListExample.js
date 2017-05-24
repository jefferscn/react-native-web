import React, { Component , PureComponent } from 'react'
import { VirtualizedList, View, Text, StyleSheet } from 'react-native'
import { storiesOf } from '@kadira/storybook';

class PureView extends PureComponent{
  render(){
    return <View style={{height:50}}><Text>{this.props.item.key} - {this.props.index}</Text></View>
  }
}

class VirtualizedListExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: Array.from(Array(1000).keys()).map((i) => ({key: i.toString()}))
    }

    this.renderItem = this.renderItem.bind(this)
    this.getItemLayout = this.getItemLayout.bind(this)
  }

  keyExtractor = (items, index) =>
        String(index);

  getItemLayout (data, index) {
    return { length: 50, offset: 50 * index, index: index }
  }

  renderItem ({item, index}) {
    return <PureView item={item} index={index}/>
    // return <View style={{height:52}}><Text>{item.key} - {index}</Text></View>
  }

  render () {
    return <VirtualizedList            
      style={styles.container}
      data={this.state.data}
      windowSize={5}
      renderItem={this.renderItem}
      getItemLayout={this.getItemLayout}
      keyExtractor={this.keyExtractor}
    />
  }
}

const examples = [{
  title: 'perf',
  render() {
    return <VirtualizedListExample />
  }
}]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

storiesOf('component: VirtualizedList', module)
  .add('perf', () => (
    <VirtualizedListExample />
  ))
