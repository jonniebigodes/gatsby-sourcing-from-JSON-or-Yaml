import React, { Component } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import axios from 'axios'
import yaml from 'js-yaml'
class ClientYAML extends Component {
  state = {
    yamlData: {},
  }
  async componentDidMount() {
    const ymlfile = await axios.get('./second.yaml')
    const data = yaml.safeLoad(ymlfile.data)
    this.setState({ yamlData: data })
  }
  render() {
    const { yamlData } = this.state
    if (!yamlData.title) {
      return <h1>fetching data! give it a moment</h1>
    }
    return (
      <Layout>
        <SEO title={yamlData.title} />
        <div>
          {yamlData.content.map(data => {
            return <div>{data.item}</div>
          })}
        </div>
      </Layout>
    )
  }
}
export default ClientYAML
