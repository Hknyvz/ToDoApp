import { Col, Row } from 'antd'
import React from 'react'

function Container({children}) {
    return (
        <Row justify="center" className="container">
            <Col span={12}>
               {children}
            </Col>
        </Row>
    )
}

export default Container
