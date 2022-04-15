const config = (method, url, data, progress) => {
  return {
    method: method,
    url: url,
    headers: {
      "x-api-key":
        "key_gAAAAABiUeksXgijIvUJIqxcN8Rh2v3djaEuTgcewLmNNLncY2kbhKqLQq2zJgHbLjjUKQ5HlxHa09xwLYiWnhCqNdQv5WYw9UJTeoPb8vv8T_97eL2v0wlF5RqLujJ-QjXS9yOKBZUbxmWJCy9iGrJMKOKpLi84hQ==",
    },
    data: data,
    onUploadProgress: progress,
  };
};
export default config;
