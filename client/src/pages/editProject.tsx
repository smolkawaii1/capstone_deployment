import { FieldValues } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "components/common/Form";
import { Box } from "@mui/material";
import { useState } from "react";

const CreateProject = () => {
  const navigate = useNavigate();
  const [profFile, setProfFile] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  const handleUpload = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });
    reader(file).then((result: string) =>
      setProfFile({ name: file?.name, url: result })
    );
  };
  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({ ...data, file: profFile.url });
  };

  return (
    <Box>
      <Form
        type="Edit"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        onFinishHandler={onFinishHandler}
        handleUpload={handleUpload}
        profFile={profFile}
      />
    </Box>
  );
};

export default CreateProject;
