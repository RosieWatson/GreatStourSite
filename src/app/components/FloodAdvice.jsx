import React from 'react'
import { Button, Col, Icon, Modal, Row } from 'antd'

const FloodAdvice = (props) => {
  return (
    <Modal
      cloasble={false}
      onCancel={props.toggleModal}
      footer={
        <Button 
          onClick={props.toggleModal} 
          onCancel={props.toggleModal}
          type='primary'
          >
          Ok
        </Button>
      }
      title="Flood Advice"
      visible={props.modalOpen}
      width='95vw'
      >
      <Row>
        <Col lg={12}>
          <h3><Icon type="warning" theme="twoTone" twoToneColor="#FF7900" /> What the flood alerts mean?</h3>
          <h5>Flood Alert</h5>
          <p>Severe flooding. Danger to life.</p>
          <ul>
            <li>Stay in a safe place with a means of escape.</li>
            <li>Be ready should you need to evacuate from your home.</li>
            <li>Co-operate with the emergency services.</li>
            <li>Call 999 if you are in immediate danger.</li>
          </ul>
          <h5>Flood Warning</h5>
          <p>Flooding is expected. Immediate action required</p>
          <ul>
            <li>Protect yourself, your family and help others.</li>
            <li>Move family, pets and valuables to a safe place.</li>
            <li>Keep a flood kit ready.</li>
            <li>Turn off gas, electricity and water supplies if safe to do so.</li>
            <li>Put flood protection equipment in place.</li>
          </ul>
          <h5>Severe Flood Warning</h5>
          <p>Flooding is possible. Be prepared.</p>
          <ul>
            <li>Be prepared to act on your flood plan.</li>
            <li>Prepare a flood kit of essential items.</li>
            <li>Monitor local water levels on our website.</li>
          </ul>
        </Col>
        <Col lg={12}>
          <h3><Icon type="notification" theme="twoTone" twoToneColor="#CE2029" /> In an emergency:</h3>
          <ol>
            <li>Check in with other people in your household - if they are not at home make sure they are somewhere safe.</li>
            <li>Gather essential items together either upstairs or in a high place.</li>
            <li>Fill jugs and saucepans with clean water.</li>
            <li>Move your family and pets upstairs, or to a high place with a means of escape.</li>
            <li>Turn off gas, electricity and water supplies when flood water is about to enter your home if safe to do so. DO NOT touch sources of electricity when standing in flood water</li>
            <li>Keep	listening	to	local	radio for	 updates	 or	 call	 floodline 0345 988 1188.</li>
            <li>Check in with vulnerable neighbours or relatives.</li>
            <li>Flood water can rise quickly, stay calm and reassure those around you. Call 999 if you are in danger.</li>
          </ol>
          <h3><Icon type="exclamation-circle" theme="twoTone" /> Remember, flood water is dangerous!</h3>
          <ul>
            <li>Six inches of fast-flowing water can knock over an adult and two feet of water can move a car.</li>
            <li>Avoid walking or driving through it.</li>
            <li>Keep children and vulnerable people away from it.</li>
            <li>Wash your hands thoroughly if you touch it.</li>
          </ul>
          <h3><Icon type="phone" theme="twoTone" twoToneColor="#52c41a" /> Enviornment agency floodline: 0345 988 1188</h3>
          <p>Open 24 hours a day. Get practical advice on what to do before, during and after flooding</p>
        </Col>
        <p></p>
      </Row>
      <p>All above information is from the <a href='https://www.gov.uk/government/publications/flooding-what-to-do-before-during-and-after-a-flood' target='_blank' rel='noopener noreferrer'>Enviornment Agency's flood advice material</a>. Visit the <a href='https://www.gov.uk/topic/environmental-management/flooding-coastal-change' target="_blank" rel="noopener noreferrer">Government website for more information on flooding</a>.</p>
    </Modal>
  )
}

export default FloodAdvice
