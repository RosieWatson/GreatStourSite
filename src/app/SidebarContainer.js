import React from 'react'

import { Layout, Button, Input, Row, Col, DatePicker, Collapse } from 'antd'

class SidebarContainer extends React.Component {
    render () {
        const Panel = Collapse.Panel;

        return (
            <Layout.Sider collapsible collapsedWidth={48}
                    reverseArrow>

                <div id="details-header">
                    <h1>Details</h1>
                </div>

                <Collapse accordion>
                    <Panel header="This is panel header 1" key="1">
                        <p>ddfd</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        <p>fdfd</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>tex</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>tex</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>tex</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>tex</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>tex</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>tex</p>
                    </Panel><Panel header="This is panel header 3" key="3">
                    <p>tex</p>
                </Panel><Panel header="This is panel header 3" key="3">
                    <p>tex</p>
                </Panel><Panel header="This is panel header 3" key="3">
                    <p>tex</p>
                </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>tex</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>tex</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>tex</p>
                    </Panel><Panel header="This is panel header 3" key="3">
                    <p>tex</p>
                </Panel><Panel header="This is panel header 3" key="3">
                    <p>tex</p>
                </Panel><Panel header="This is panel header 3" key="3">
                    <p>tex</p>
                </Panel>


                </Collapse>
            </Layout.Sider>
        )
    }
}

export default SidebarContainer