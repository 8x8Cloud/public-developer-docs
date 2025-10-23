# Releases

Jitsi as a Service is by default using the latest release. To have full control over which release is being used in your app, you can pin a certain release. That version will be used until it is unpinned or deprecated.

![2928](../images/36ac722-JaaS_Releases_UI_1.png "JaaS Releases UI (1).png")

## Concepts

The **pinned release version** is what is currently used in your app and the one you have pinned your tenancy to. You can unpin it anytime to use the latest GA version.

The **previously pinned release version** was used before the currently pinned one. You can come back to this version in case the newer one is not yet entirely compatible with your application.

The **current release version** can be the pinned one or the latest GA release, if you did not pin a particular version.

The **pinnable release versions** are conventionally the latest two GA versions, the pinned and the previously pinned ones.

The **intermediate release versions** are the ones created between your pinned version and the latest two GA releases, and you can use their release notes to look over the functionalities you can integrate in your app by upgrading your JaaS version.

We typically **deprecate** release versions that are over 3 months old. If your tenant is pinned to such a version, your application will end up using the latest GA version.

## Steps

When using the JaaS Releases functionality, we recommend checking out the release notes (from the Details view) to get ready for the upcoming features and fixes that will affect your app.

You can test a release version without pinning it, by using the `release` config option. Click the "Test this release" link to find the exact snippet you need to use to test the specific release.

If you choose to stick to a version, you can pin it to make certain that no future releases impact your application. It will take approximately 2 minutes until the changes are applied. The rooms that already exist may take up to 10 minutes after the call has ended to switch to a new release version.
