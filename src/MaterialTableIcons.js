import React, { forwardRef } from "react";

import NotificationsIcon from '@material-ui/icons/Notifications';

const tableIcons = {

    Notification: forwardRef((props, ref) => <NotificationsIcon {...props} ref={ref} />)

};

export default tableIcons;