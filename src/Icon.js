import React, { useEffect, useState, useCallback } from "react";
import CircleIcon from '@mui/icons-material/Circle';

function Icon({ status, override }) {
  const [color, setColor] = useState();

  useEffect(() => {
		if(status === 'pass') {
      setColor('#ADFF2F');
    } else if (status === 'fail') {
      setColor('#FF0000');
    } else if (status === 'submit') {
      setColor('#87CEEB');
    }
	}, [status]);

	return (
    <CircleIcon sx={{ color: !override ? color : '#f6f217' }} />
	);
};

export default Icon;
