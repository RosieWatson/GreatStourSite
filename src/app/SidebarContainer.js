import React from 'react'

import { Layout, Button, Input, Row, Col, DatePicker } from 'antd'

class SidebarContainer extends React.Component {
    render () {
    
        return (
            <Layout.Sider id="sider-root"
                collapsible
                reverseArrow
                width="30%">

            </Layout.Sider>
        )
    }
}

export default SidebarContainer