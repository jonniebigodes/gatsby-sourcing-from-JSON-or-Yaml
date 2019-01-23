import React, { Component } from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import SEO from '../components/seo'
import uuid from 'uuid'
class ClientJSON extends Component {
  state = {
    isError:false,
    errorMessage:'',
    jsonData: {},
  }
  async componentDidMount() {
    try {
      const JSONRequest = await axios.get(
        process.env.NODE_ENV !== 'production'
          ? './second.json'
          : 'https://hungry-edison-90c8ac.netlify.com/second.json'
      )
      this.setState({ jsonData: JSONRequest.data })
    } catch (error) {
      this.setState({isError:true,errorMessage:error})
      console.log('====================================');
      console.log(`ERROR ON LOAD DATA:\n${error}`);
      console.log('====================================');
    }
    
  }
  render() {
    const { jsonData,isError,errorMessage  } = this.state
    if(isError){
      return(
        <h1>Something went bad</h1>
      <h3>
        {errorMessage}
      </h3>
      )
    }
    if (!jsonData.title) {
      return <h1>fetching data! give it a moment</h1>
    }
    return (
      <Layout>
        <SEO title={jsonData.title} />
        <div>
          {jsonData.content.map(data => {
            return <div key={`content_item_${uuid.v4()}`}>{data.item}</div>
          })}
        </div>
      </Layout>
    )
  }
}

export default ClientJSON
