import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="wr-footer">
                {this.props.children}
                <p className="wr-design-by">
                    <span>Design by </span>
                    <span>Trần Duy Phong</span>
                </p>
            </footer>
        );
    }
}

export default Footer;