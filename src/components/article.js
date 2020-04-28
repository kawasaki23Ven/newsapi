import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import OpenInNew from '@material-ui/icons/OpenInNew'
import { Tooltip } from '@material-ui/core';
import AlertDialog from './confirm-dialog';
import styles from '../utils/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 5,
    marginBottom: 5,
    border : `1px solid ${styles.backgroundColor}`,
    boxShadow : "5px 8px #8888884d"
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  header :{
    backgroundColor: "#051626ad",
    color: "white",
    minHeight : "5.75rem"
  },
  title:{
    overflow: 'hidden',
    textOverflow : 'ellipsis',
    display: "-webkit-box",
    WebkitLineClamp : 2,
    WebkitBoxOrient : 'vertical'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    whiteSpace : "nowrap",
    fontSize : "1rem",
    backgroundColor : styles.backgroundColorPrimary
  },
}));

export default function Article(props) {
  const classes = useStyles();
  const childRef = useRef();

  const removeArticle = () => {
    props.removeArticle(props.index);
  };

  return (
    <Card className={classes.root} justify="center">
      <AlertDialog ref={childRef}
        title={"Do you want to hide the selected item?"}
        message={"This action can't be reversed"}
        closeOption={removeArticle}
      />
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {(props.source || "").substring(0,3).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() =>  childRef.current.openDialog()}>
            <Visibility />
          </IconButton>
        }
        title={props.title}
        classes={{title : classes.title, root: classes.header}}
        subheader={new Date(props.date).toLocaleString()}
      />
      <CardMedia
        className={classes.media}
        image={props.image || './unnamed.png' }
        src={props.image}
      />
      <CardContent>
        <Tooltip title={props.description || "No Description"}>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.title} style={{minHeight: "2.5rem"}}>
          {props.description ||  "No Description" }
        </Typography>
        </Tooltip>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title={props.author || "Unknown"}>
          <Typography className={classes.title}>
            <strong>Author: </strong> {props.author || "Unknown"}
          </Typography>
        </Tooltip>
        <Tooltip title="Open Url In New Tab">
          <a target="_blank" rel="noopener noreferrer" href={props.url} >
            <IconButton aria-label="share">
              <OpenInNew />
            </IconButton>
          </a>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
