## Readable Project

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Several key node modules were installed. Namely, [material-ui](https://material-ui.com), for interface, [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui), for icons, [redux-form] (redux form initial values), for easy form state, and [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui/tree/5.0), for a bridge between redux-form and material-ui.

## Installation and Running
Within the * `frontend` directory run the following commands:
* `npm install` will install all node modules required for the project.
* `npm start` or * `yarn start` will begin the Readable App.



## Folder Structure

After creation, your project should look like this:

```
api-server/
frontend/
  public/
    css/
      custom.css
    favicon.ico
    index.html
    manifest.json
  src/
    actions/
      categories.js
      comments.js
      constants.js
      posts.js
      sort_by.js
    api/
      categories.js
      comments.js
      constants.js
      index.js
      posts.js
    components/
      app.js
      content_post_detail_comment_form.js
      content_post_detail_comments.js
      content_post_detail.js
      content_post_form.js
      content_post_list.js
      content.js
      side_bar_categories.js
      side_bar.js
    reducers/
      categories.js
      comments.js
      index.js
      posts.js
      sort_by.js
    selectors
      index.js
    utils
      helpers.js
    app.test.js
    index.js
    logo.svg
    registerServiceWorker.js
  package.json
README.md
```

## Sending Feedback

I am always open to [your feedback](http://jessequinn.info).
