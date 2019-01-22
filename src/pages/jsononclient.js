import React, { Component } from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import SEO from '../components/seo'

class ClientJSON extends Component {
  state = {
    jsonData: {},
  }
  async componentDidMount() {
    const JSONRequest = await axios.get('./second.json')
    this.setState({ jsonData: JSONRequest.data })
  }
  render() {
    const { jsonData } = this.state
    if (!jsonData.title) {
      return <h1>fetching data! give it a moment</h1>
    }
    return (
      <Layout>
        <SEO title={jsonData.title} />
        <div>
          {jsonData.content.map(data => {
            return <div>{data.item}</div>
          })}
        </div>
      </Layout>
    )
  }
}

export default ClientJSON
