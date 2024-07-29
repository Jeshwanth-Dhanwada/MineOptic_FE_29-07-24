import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/apiConstants';

export default memo((props) => {
  const [data, setData] = useState(props.data);
  const [Nodedata, setNodedata] = useState([]);
  // const [ImageLink, setImage] = useState(data.node.url);
  const [height, setheight] = useState([]);
  const [width, setwidth] = useState([]);
  // This effect will run whenever props.data changes
  useEffect(() => {
    setData(props.data);
    // setImage(props.data.node.url) 
  }, [props.data]);
  useEffect(() => {
    const apiUrl = `${BASE_URL}/api/nodeMaster`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data,"0305")
        setNodedata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [imageSrc, setImageSrc] = useState([]);
  useEffect(() => {
    const image = Nodedata.filter((item) => item.nodeName == data.label).map((item) => item.nodeImage)
    const height = Nodedata.filter((item) => item.nodeName == data.label).map((item) => item.height)
    const width = Nodedata.filter((item) =>  item.nodeName == data.label).map((item) => item.width)
    setheight(height)
    setwidth(width)
    // Fetch the image from your server
    axios.get(`http://localhost:5000/image/${image}`, { responseType: 'blob' })
      .then(response => {
        console.log(image,"0305")
        console.log(response.data,"0305")
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl)
        })
      .catch(err => {
        console.log(err);
      });

    // Cleanup function to revoke the object URL when component unmounts
    return () => {
        URL.revokeObjectURL(imageSrc);
    };
  }, [data.label,Nodedata])


  return (
    <div>
        <img src={imageSrc} style={{ width: '297px', height: '178px', borderRadius:'10px' }} alt='machine'></img>
    </div>
  );
});
