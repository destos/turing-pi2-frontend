import * as React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UsbIcon from '@mui/icons-material/Usb';
import { Chip, Switch } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { NodeInfo } from '@/store/nodes';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export interface NodeProps {
  node: NodeInfo;
}

const Node: React.FC<NodeProps> = ({ node }) => {
  const [expanded, setExpanded] = React.useState(false);

  const { id, power, info, icon, usbMode } = node;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const setPower = (set: boolean) => {
    return;
  };

  const powerColor = power ? green[500] : red[500];

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: powerColor, fontWeight: 800 }} aria-label="node">
            {icon ? icon : id}
          </Avatar>
        }
        action={
          <>
            {usbMode ? (
              <Chip
                sx={{ marginRight: (theme) => theme.spacing(1) }}
                icon={<UsbIcon />}
                color="secondary"
                label={usbMode}
                variant="outlined"
                size="small"
              />
            ) : null}
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </>
        }
        title={info}
        subheader="extra"
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <Switch
          size="small"
          name="power"
          color="success"
          checked={power}
          onChange={() => {
            setPower(!power);
          }}
        />
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Node;
