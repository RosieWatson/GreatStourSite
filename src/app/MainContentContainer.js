import React from 'react'
import {Alert, Layout} from 'antd'

import Map from './components/Map'

class MainContentContainer extends React.Component {
    render () {
        return (
            <Layout.Content>
                <Alert message="Flood Warning banner!" banner> </Alert>
                <Map />
            </Layout.Content>
        )
    }
}

export default MainContentContainer