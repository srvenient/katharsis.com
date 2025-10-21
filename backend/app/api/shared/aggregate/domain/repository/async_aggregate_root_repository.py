import asyncio
from abc import ABC
from typing import Optional, TypeVar

from app.api.shared.aggregate.domain.repository.aggregate_root_repository import AggregateRootRepository

T = TypeVar("T")


class AsyncAggregateRootRepository(AggregateRootRepository[T], ABC):
    """
    Asynchronous adapter for `AggregateRootRepository`.

    This class provides asynchronous wrappers for the synchronous methods
    defined in `AggregateRootRepository`, executing them in a separate thread
    using `asyncio.to_thread`. This allows synchronous repository implementations
    to be safely called from asynchronous contexts without blocking the event loop.

    Subclasses should not override these methods unless providing a fully
    asynchronous implementation.

    :since: 0.0.1
    """

    async def delete_async(self, **filters) -> bool:
        """
        Asynchronously delete an aggregate root by its unique identifier.

        :param _id: The unique identifier of the aggregate root to delete.
        :return: True if the aggregate root was deleted successfully, False otherwise.
        """
        return await asyncio.to_thread(self.delete_sync, **filters)

    async def delete_all_async(self) -> None:
        """
        Asynchronously delete all aggregate roots from the repository.
        """
        await asyncio.to_thread(self.delete_all_sync)

    async def delete_and_retrieve_async(self, **filters) -> Optional[T]:
        """
        Asynchronously delete an aggregate root and return the deleted instance.

        :return: The deleted aggregate root if found, None otherwise.
        """
        return await asyncio.to_thread(self.delete_and_retrieve_sync, **filters)

    async def exists_async(self, **filters) -> bool:
        """
        Asynchronously check if an aggregate root exists in the repository.

        :return: True if the aggregate root exists, False otherwise.
        """
        return await asyncio.to_thread(self.exists_sync, **filters)

    async def find_async(self, **filters) -> Optional[T]:
        """
        Asynchronously retrieve an aggregate root by its unique identifier.

        :return: The aggregate root if found, None otherwise.
        """
        return await asyncio.to_thread(self.find_sync, **filters)

    async def find_all_async(self) -> list[T]:
        """
        Asynchronously retrieve all aggregate roots.

        :return: A list containing all aggregate roots in the repository.
        """
        return await asyncio.to_thread(self.find_all_sync)

    async def find_ids_async(self) -> list[str]:
        """
        Asynchronously retrieve the identifiers of all aggregate roots.

        :return: A list of aggregate root unique identifiers.
        """
        return await asyncio.to_thread(self.find_ids_sync)

    async def save_async(self, aggregate_root: T) -> None:
        """
        Asynchronously save an aggregate root.

        :param aggregate_root: The aggregate root instance to save.
        """
        await asyncio.to_thread(self.save_sync, aggregate_root)
