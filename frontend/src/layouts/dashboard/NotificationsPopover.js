import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import axios from 'axios';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [inboxes, setInboxes] = useState();
  const [message, setMessage] = useState("");
  const [totalUnRead, setTotalUnRead] = useState(0);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const bindInboxes = async () => {
    await axios.get(`http://localhost:9000/api/inboxes`)
      .then(res => {
        const inboxes = res.data;
        setInboxes(inboxes);
        setTotalUnRead(totalUnRead + inboxes.filter((item) => item.status === false).length);
      })
      .catch((err) => setMessage("Error: can't read inboxes."))
  };


  useEffect(() => {
    bindInboxes();
  }, []);

  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>{message}</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Inboxes
              </ListSubheader>
            }
          >
            {inboxes?.map((inbox) => {
              if (!inbox.status) {
                return (
                  <Button onClick={() => { navigate('/dashboard/inboxes'); setOpen(false) }}
                    style={{ width: '100%' }}>
                    <NotificationItem key={inbox._id} notification={inbox} />
                  </Button>
                )
              };
              return null;
            }
            )}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    tenant: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
    status: PropTypes.bool,
    createdAt: PropTypes.string,
  }),
};


function NotificationItem({ notification }) {
  const avatar = <img alt={"icon_bell"} src="/static/icons/ic_notification_mail.svg" />;
  return (
    <ListItemButton
      onClick={
        null
      }
      sx={{
        px: 2.5,
        ...(!notification.status && {
          bgcolor: 'action.selected',
        }),
        height:70
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={notification.tenant}
        secondary={
          <>
            <Typography
              variant="caption"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              {notification.subject}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
              {fToNow(notification.createdAt)}
            </Typography>
          </>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------
