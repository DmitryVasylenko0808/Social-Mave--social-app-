import { useState } from "react";
import { InfiniteScroll, ArticleItem } from "../common/components";
import { useGetBookmarkedArticlesQuery } from "../api/articles/bookmarked.article.api";
import { useAuth } from "../hooks/useAuth";
import { ArrowLeft } from "lucide-react";
import { Button } from "../common/ui";
import { useNavigate } from "react-router";

const BookmarksArticles = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { user } = useAuth();
  const { data, isFetching, isError } = useGetBookmarkedArticlesQuery({
    userId: user.userId as string,
    page,
  });

  const next = () => setPage(page + 1);

  const handleClickBack = () => navigate(-1);

  if (isError) {
    return <span>Error.</span>;
  }

  return (
    <div className="px-6 py-2">
      <div className="mb-10 flex items-center gap-3.5">
        <Button variant="terciary" onClick={handleClickBack}>
          <ArrowLeft />
        </Button>
      </div>
      <InfiniteScroll
        next={next}
        currentPage={page}
        isFetching={isFetching}
        totalPages={data?.totalPages || 0}
      >
        <div className="flex flex-col gap-14">
          {data?.data.map((article) => (
            <ArticleItem data={article} key={article._id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BookmarksArticles;