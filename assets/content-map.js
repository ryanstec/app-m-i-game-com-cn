// assets/content-map.js
// Content partition, keyword tags, and search filter functions

const contentMap = {
  site: "https://app-m-i-game.com.cn",
  defaultTag: "爱游戏",
  partitions: [
    {
      id: "news",
      label: "新闻中心",
      tags: ["爱游戏", "游戏资讯", "行业动态"],
      items: [
        { title: "新版发布预告", slug: "new-release-preview" },
        { title: "合作赛事报道", slug: "cooperation-event" }
      ]
    },
    {
      id: "guides",
      label: "攻略专区",
      tags: ["爱游戏", "新手教程", "进阶技巧"],
      items: [
        { title: "新手入门指南", slug: "beginners-guide" },
        { title: "装备搭配推荐", slug: "equipment-builds" }
      ]
    },
    {
      id: "community",
      label: "玩家社区",
      tags: ["爱游戏", "讨论", "同人创作"],
      items: [
        { title: "热门讨论帖", slug: "hot-discussions" },
        { title: "创作征集活动", slug: "fan-art-contest" }
      ]
    }
  ]
};

function searchByKeyword(data, keyword) {
  const kw = keyword.trim().toLowerCase();
  if (!kw) return [];
  const results = [];
  for (const partition of data.partitions) {
    const matchedTags = partition.tags.filter(t => t.toLowerCase().includes(kw));
    if (matchedTags.length > 0) {
      results.push({
        partitionId: partition.id,
        partitionLabel: partition.label,
        matchedTags: matchedTags,
        items: partition.items
      });
    }
  }
  return results;
}

function filterByTag(data, tag) {
  const t = tag.trim().toLowerCase();
  if (!t) return data.partitions;
  return data.partitions.filter(p =>
    p.tags.some(tagItem => tagItem.toLowerCase().includes(t))
  );
}

function getAllTags(data) {
  const tagSet = new Set();
  for (const partition of data.partitions) {
    for (const tag of partition.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

function getPartitionById(data, id) {
  return data.partitions.find(p => p.id === id) || null;
}

function formatPartitionSummary(partition) {
  return {
    id: partition.id,
    label: partition.label,
    tags: partition.tags.join(", "),
    itemCount: partition.items.length
  };
}

// Example usage (uncomment to test):
// console.log(searchByKeyword(contentMap, "爱游戏"));
// console.log(filterByTag(contentMap, "攻略"));
// console.log(getAllTags(contentMap));
// console.log(getPartitionById(contentMap, "community"));
// console.log(formatPartitionSummary(contentMap.partitions[0]));