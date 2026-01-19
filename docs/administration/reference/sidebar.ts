import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Addresses",
      items: [
        {
          type: "doc",
          id: "administration/reference/list-addresses",
          label: "List addresses",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "administration/reference/create-address",
          label: "Create address",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "administration/reference/get-address",
          label: "Get address by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "administration/reference/delete-address",
          label: "Delete address",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Operations",
      items: [
        {
          type: "doc",
          id: "administration/reference/get-operation",
          label: "Get operation by ID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "PhoneNumbers",
      items: [
        {
          type: "doc",
          id: "administration/reference/list-phone-numbers",
          label: "List phone numbers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "administration/reference/get-phone-number",
          label: "Get phone number by ID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "RingGroups",
      items: [
        {
          type: "doc",
          id: "administration/reference/list-ring-groups",
          label: "List ring groups",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "administration/reference/create-ring-group",
          label: "Create a ring group",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "administration/reference/get-ring-group",
          label: "Get ring group by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "administration/reference/update-ring-group",
          label: "Update a ring group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "administration/reference/delete-ring-group",
          label: "Delete a ring group",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Sites",
      items: [
        {
          type: "doc",
          id: "administration/reference/create-site",
          label: "Create a new site",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "administration/reference/list-sites",
          label: "List sites",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "administration/reference/get-site",
          label: "Get site by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "administration/reference/update-site",
          label: "Update site",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "administration/reference/delete-site",
          label: "Delete site",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Users",
      items: [
        {
          type: "doc",
          id: "administration/reference/list-users",
          label: "List users",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "administration/reference/create-user",
          label: "Create user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "administration/reference/get-user",
          label: "Get user by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "administration/reference/update-user",
          label: "Update user",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "administration/reference/delete-user",
          label: "Delete user",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
