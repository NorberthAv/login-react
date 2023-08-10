import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const QRCodeToImage = ({ url }) => {
    return <QRCode value={url} size={100} bgColor="#282c34" fgColor="#fff" level="H" />;
};

export default QRCodeToImage;