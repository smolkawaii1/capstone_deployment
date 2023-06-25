export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface ProfileProps {
  type: string;
  name: string;
  avatar: string;
  email: string;
}

export interface ProjectProps {
  _id: string;
  title: string;
  description: string;
  sectorType: string;
  fund: string;
  proponents: string;
  duration: string;
  source: string;
}

export interface FormProps {
  type: string;
  register: any;
  onFinish: (data: {
    values: FieldValues;
    duration: {
      startDate: value[0];
      endDate: value[1];
    };
    expectOutputDuration: {
      startDate: outputDuration[0];
      endDate: outputDuration[1];
    };
  }) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;

  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  handleUpload: (file) => void;
  profFile: { url: string };
}
