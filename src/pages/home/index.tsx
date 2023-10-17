import React, { useEffect, useState } from "react";
import { getTopicListQuery } from "@/hooks/services/queries/photo";
import {
  Card,
  List,
  Pagination,
  PaginationProps,
  Skeleton,
  Space,
  Spin,
  Tabs,
  Image,
} from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";

interface PhotoListPaginationProps {
  id: string;
  totalCount: number;
}

function PhotoListPagination({ id, totalCount }: PhotoListPaginationProps) {
  const [current, setCurrent] = useState<number>(1);
  const [photoList, setPhotoList] = useState<any[]>();
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      axios
        .get(
          `${
            import.meta.env.VITE_APP_SERVER
          }/topics/${id}/photos?page=${current}`,
          {
            headers: {
              "Accept-Version": "v1",
              Authorization: `Client-ID ${import.meta.env.VITE_APP_CLIENT_KEY}`,
            },
          }
        )
        .then((response) => {
          setPhotoList(response.data);
          setIsLoading(false);
          if (initLoading) setInitLoading(false);
        });
    } catch (error) {
      console.log("error", error);
      // Handle errors here
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, current]);

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <div>
      {
        <List
          grid={{ gutter: 16, column: 5 }}
          loading={initLoading}
          dataSource={photoList}
          renderItem={(item: any) => (
            <List.Item>
              <Card
                hoverable
                loading={isLoading}
                style={{ width: 240, height: 300 }}
                cover={
                  isLoading ? (
                    <Space>
                      <Skeleton.Image
                        active
                        style={{ width: 240, height: 200 }}
                      />
                    </Space>
                  ) : (
                    <Image
                      alt={item.alt_description}
                      src={`${item.urls.raw}&fit=crop&crop=faces&w=240&h=200`}
                      preview={false}
                    />
                  )
                }
              >
                <Meta
                  title={item.title}
                  description={item.description}
                  style={{ height: 60 }}
                ></Meta>
              </Card>
            </List.Item>
          )}
        />
      }
      <Pagination
        defaultCurrent={current}
        onChange={onChange}
        total={totalCount}
      />
    </div>
  );
}

function HomePageComponent() {
  const getTopicList = getTopicListQuery();
  const [currentTopicId, setCurrentTopicId] = useState<string>();

  const onClickTab = (activeKey: string) => {
    setCurrentTopicId(activeKey);
  };

  return (
    <>
      <div className="contents">
        {getTopicList.isLoading ? (
          <Spin size="large" />
        ) : (
          <Tabs
            defaultActiveKey={getTopicList.data[0].id}
            activeKey={currentTopicId}
            items={getTopicList.data.map((v: any) => ({
              label: v.title,
              key: v.id,
              children: (
                <PhotoListPagination
                  key={v.id} // Add a unique key for each item
                  id={v.id}
                  totalCount={Math.ceil(v.total_photos / 10)}
                />
              ),
            }))}
            onTabClick={onClickTab}
          />
        )}
      </div>
    </>
  );
}

export default HomePageComponent;
