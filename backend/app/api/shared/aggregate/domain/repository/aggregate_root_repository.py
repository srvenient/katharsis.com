from abc import ABC, abstractmethod
from typing import TypeVar, Optional, Generic

# Type variable for the Aggregate Root type
# This allows the repository to be generic over different Aggregate Root types.
T = TypeVar("T")


class AggregateRootRepository(ABC, Generic[T]):
    """
    Abstract base class for all Aggregate Root repositories in the domain layer.

    This interface defines the essential synchronous CRUD operations for working
    with Aggregate Roots in a Domain-Driven Design (DDD) context.

    Concrete implementations should handle the persistence logic (e.g., SQL, NoSQL, in-memory).

    :since: 0.0.1
    """

    @abstractmethod
    def delete_sync(self, **filters) -> bool:
        """
        Remove an Aggregate Root from the repository by its unique identifier.

        :return: True if the Aggregate Root was found and deleted, False otherwise.
        """
        pass

    @abstractmethod
    def delete_all_sync(self) -> None:
        """
        Remove all Aggregate Roots from the repository.

        :return: None
        """
        pass

    @abstractmethod
    def delete_and_retrieve_sync(self, **filters) -> Optional[T]:
        """
        Remove an Aggregate Root from the repository and return the deleted instance.

        :return: The deleted Aggregate Root instance, or None if it was not found.
        """
        pass

    @abstractmethod
    def exists_sync(self, **filters) -> bool:
        """
        Check whether an Aggregate Root exists in the repository.

        :return: True if the Aggregate Root exists, False otherwise.
        """
        pass

    @abstractmethod
    def find_sync(self, **filters) -> Optional[T]:
        """
        Retrieve an Aggregate Root by its unique identifier.

        :return: The Aggregate Root instance if found, otherwise None.
        """
        pass

    @abstractmethod
    def find_all_sync(self) -> list[T]:
        """
        Retrieve all Aggregate Roots stored in the repository.

        :return: A list containing all Aggregate Roots.
        """
        pass

    @abstractmethod
    def find_ids_sync(self) -> list[str]:
        """
        Retrieve the unique identifiers of all Aggregate Roots in the repository.

        :return: A list of Aggregate Root IDs.
        """
        pass

    @abstractmethod
    def save_sync(self, aggregate_root: T) -> None:
        """
        Persist an Aggregate Root to the repository.
        If the Aggregate Root already exists, it should be updated.

        :param aggregate_root: The Aggregate Root instance to persist.
        :return: None
        """
        pass
