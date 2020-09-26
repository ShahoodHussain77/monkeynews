const getFilteredRedditData = listData =>
  listData.map(({ data }) => ({
    id: data.subreddit_id,
    username: data.author,
    time: data.created_utc,
    title: data.title,
    like: data.score,
    link: data.url,
    desc: data.selftext,
    tagName: data.link_flair_text,
    tagColor: data.link_flair_background_color
  }));

export { getFilteredRedditData };
