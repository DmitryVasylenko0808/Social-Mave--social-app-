import { useCreateCommentMutation } from "../../../api/articles/comments.api";
import { useParams } from "react-router";
import { useAlerts } from "../../../hooks/useAlerts";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { TextArea, Button, Loader } from "../../common/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createCommentSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

type ArticleCommmentFormFields = z.infer<typeof createCommentSchema>;

const ArticleCommentForm = () => {
  const alerts = useAlerts();
  const { t } = useTranslation();
  const { articleId } = useParams();
  const [triggerCreateComment, { isLoading }] = useCreateCommentMutation();
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArticleCommmentFormFields>({
    resolver: zodResolver(createCommentSchema),
  });

  const submitHandler = (data: ArticleCommmentFormFields) => {
    const createCommentData = { articleId: articleId as string, ...data };

    triggerCreateComment(createCommentData)
      .unwrap()
      .then(() => reset())
      .catch((err) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
        setError("text", { type: "server", message: err.data.message });
      });
  };

  return (
    <form
      className="p-4 pb-2.5 bg-labelFill dark:bg-dark-100"
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextArea
        className="mb-4 bg-white"
        rows={5}
        placeholder={t("articleCommentsForm.placeholder")}
        error={errors.text?.message}
        {...register("text")}
      />
      <div className="flex justify-end items-center">
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading ? (
            <Loader size="small" variant="secondary" />
          ) : (
            t("articleCommentsForm.submitBtn")
          )}
        </Button>
      </div>
    </form>
  );
};

export default ArticleCommentForm;
