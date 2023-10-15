declare namespace API {
  type CreatePhotoDto = {
    url: string;
    user: number;
  };

  type CreateUserDto = {
    name: string;
  };

  type PhotoResult = {
    /** Id bản ghi */
    id: string;
    /** Url photo */
    url: string;
    /** User */
    user: UserBaseResult;
  };

  type UserBaseResult = {
    /** Id bản ghi */
    id: string;
    /** Name */
    name: string;
  };

  type UserResult = {
    /** Id bản ghi */
    id: string;
    /** Name */
    name: string;
    /** All photos */
    photos: PhotoResult[];
  };
}
