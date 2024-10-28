import React from "react";
import { Spin } from 'antd'; // Ant Design spinner
import { LoadingOutlined } from '@ant-design/icons'; // Loading icon from Ant Design
import './Loader.css'; // Add custom CSS for transitions

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-content">
                {/* Customize Spin with Ant Design's LoadingOutlined icon */}
                <Spin
                    indicator={<LoadingOutlined style={{ fontSize: 48, color: '#D56F00' }} spin />}
                />
                <p className="loader-text">Loading, please wait...</p>
            </div>
        </div>
    );
}

export default Loader;
