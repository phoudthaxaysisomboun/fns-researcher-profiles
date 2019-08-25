import React from "react";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  VKShareButton,
  RedditShareButton,
  ViberShareButton,
  LineShareButton,
  PocketShareButton,
  InstapaperShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  RedditIcon,
  ViberIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  EmailIcon,
  VKIcon
} from "react-share";

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { CloseOutlined } from "@material-ui/icons";

const ShareDialog = ({
  open,
  close,
  user,
  profile,
  url,
  handleShareCount,
  title,
  description
}) => {
  return (
    <>
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={close}
      scroll="paper"
    >
      <DialogTitle style={{ padding: 0 }}>
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              padding: "16px",
              fontWeight: "bold",
              fontFamily: "'Noto Sans Lao UI', sans serif"
            }}
          >
            <Typography variant="inherit">ແບ່ງປັນ</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            align="right"
            onClick={close}
            style={{ padding: "16px" }}
          >
            <IconButton style={{ padding: 0 }}>
              <CloseOutlined />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent style={{ padding: "16px", paddingTop: 0 }}>
        <Grid
          container
          direction="row"
          spacing={8}
          alignContent="center"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <FacebookShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                quote={title}
              >
                <FacebookIcon size={60} round={true} />
                {
                  //   <FacebookShareCount
                  //   quote={``}
                  //   url={url} onShareWindowClose = {()=>{handleShareCount()}}
                  // >
                  //   {shareCount => <span>{shareCount}</span>}
                  // </FacebookShareCount>
                }
                Facebook
              </FacebookShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <TwitterShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
              >
                <TwitterIcon size={60} round={true} />
                Twitter
              </TwitterShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <WhatsappShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
              >
                <WhatsappIcon size={60} round={true} />
                Whatsapp
              </WhatsappShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <EmailShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                subject={title}
                body={description}
              >
                <EmailIcon size={60} round={true} />
                Email
              </EmailShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <LineShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
              >
                <LineIcon size={60} round={true} />
                Line
              </LineShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <LinkedinShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
              >
                <LinkedinIcon size={60} round={true} />
                Linkedin
              </LinkedinShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <PocketShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
              >
                <PocketIcon size={60} round={true} />
                Pocket
              </PocketShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <InstapaperShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
              >
                <InstapaperIcon size={60} round={true} />
                Instapaper
              </InstapaperShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <VKShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
                description={description}
              >
                <VKIcon size={60} round={true} />
                VK
              </VKShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <RedditShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
              >
                <RedditIcon size={60} round={true} />
                Reddit
              </RedditShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <ViberShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
              >
                <ViberIcon size={60} round={true} />
                Viber
              </ViberShareButton>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{
                alignContent: "center",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              <TelegramShareButton
                url={url}
                onShareWindowClose={() => {
                  handleShareCount();
                }}
                title={title}
              >
                <TelegramIcon size={60} round={true} />
                Telegram
              </TelegramShareButton>
            </Button>
          </Grid>
          <Grid item xs={9}>
            <TextField
              disabled
              style={{ padding: 0 }}
              defaultValue={url}
              margin="none"
              variant="outlined"
              fullWidth
              inputProps={{
                style: {
                  padding: "8px",
                  margin: 0,
                  backgroundColor: "#f7f7f7",
                  borderRadius: "4px"
                }
              }}
            />
          </Grid>
          <Grid item xs={3} align="right">
            <CopyToClipboard
              text={url}
            >
            <Button onClick={close} color= "primary">ຄັດລອກ</Button>
            </CopyToClipboard>
            
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>

    {
      // <Snackbar
      //     anchorOrigin={{
      //       vertical: 'bottom',
      //       horizontal: 'left',
      //     }}
      //     open={true}
      //     autoHideDuration={6000}
      //     message={<span>Note archived</span>}
      //      />
    }
           
    </>
  );
};

export default ShareDialog;
