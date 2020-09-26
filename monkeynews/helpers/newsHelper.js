// import { parseString } from "react-native-xml2js";

const getNewsFilterData = listData => {
  let finalValue = [];
  parseString(listData, (err, result) => {
    //  console.log(result);
    const Data = result.rss.channel[0].item;

    finalValue = Data.map(item => {
      const asd = {
        title: item.title[0],
        image: item["media:content"][0].$.url,
        time: item.pubDate[0],
        url: item.link[0]
      };

      return asd;
    });
  });

  return finalValue;
};

//   listData.map(({ data }) => ({
//     id: data.subreddit_id,
//     username: data.author,
//     time: data.created_utc,
//     title: data.title,
//     like: data.score,
//     link: data.url,
//     desc: data.selftext,
//     tagName: data.link_flair_text,
//     tagColor: data.link_flair_background_color
//   }));

export { getNewsFilterData };
