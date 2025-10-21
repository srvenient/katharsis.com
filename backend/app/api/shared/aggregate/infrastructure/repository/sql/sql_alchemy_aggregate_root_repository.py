from typing import TypeVar, Optional, List, Type

from sqlmodel import Session, select, delete

from app.api.shared.aggregate.domain.repository.async_aggregate_root_repository import AsyncAggregateRootRepository

T = TypeVar("T")


class SQLAlchemyAggregateRootRepository(AsyncAggregateRootRepository[T]):
    """
     Repository implementation for managing Aggregate Roots using SQLAlchemy.

     This repository is **primarily asynchronous**, providing async methods for
     non-blocking operations in event-driven or concurrent environments.

     However, it also includes **synchronous counterparts** (methods with the
     `_sync` suffix) for scenarios where:
         - You are running code in a fully synchronous context.
         - You want to avoid `await` for quick blocking calls.
         - You are using environments without async support.

     **Important:**
         - The synchronous methods are **blocking** and should not be called
           from async event loops without running them in a separate thread or
           process.
         - For high concurrency, prefer the async methods.
     """

    def __init__(self, session: Session, aggregate_root: Type[T]):
        self.session = session
        self.aggregate_root = aggregate_root

    def delete_sync(self, **filters) -> bool:
        """
        Delete an aggregate root matching the provided filters.

        Example:
            repo.delete_sync(id="123")
            repo.delete_sync(email="test@example.com")

        Args:
            **filters: Keyword arguments matching model fields.

        Returns:
            bool: True if a record was deleted, False otherwise.
        """
        statement = select(self.aggregate_root).filter_by(**filters)
        obj = self.session.exec(statement).first()
        if obj:
            self.session.delete(obj)
            self.session.commit()
            return True
        return False

    def delete_all_sync(self) -> None:
        """
        Delete all aggregate roots from the repository.

        Note:
            This is a blocking method and may be expensive for large datasets.
        """
        statement = delete(self.aggregate_root)
        self.session.execute(statement)
        self.session.commit()

    def delete_and_retrieve_sync(self, **filters) -> Optional[T]:
        """
        Delete an aggregate root and return it.

        Example:
            repo.delete_and_retrieve_sync(id="123")
            repo.delete_and_retrieve_sync(email="test@example.com")

        Args:
            **filters: Keyword arguments matching model fields.

        Returns:
            Optional[T]: The deleted aggregate root if found, otherwise None.
        """
        statement = select(self.aggregate_root).filter_by(**filters)
        obj = self.session.exec(statement).first()
        if obj:
            self.session.delete(obj)
            self.session.commit()
            return obj
        return None

    def exists_sync(self, **filters) -> bool:
        """
        Check if an aggregate root exists with the given filters.

        Example:
            repo.exists_sync(id="123")
            repo.exists_sync(email="test@example.com")
        """
        statement = select(self.aggregate_root).filter_by(**filters)
        return self.session.exec(statement).first() is not None

    def find_sync(self, **filters) -> Optional[T]:
        """
        Retrieve an aggregate root matching the filters.

        Example:
            repo.find_sync(id="123")
            repo.find_sync(email="test@example.com")
        """
        statement = select(self.aggregate_root).filter_by(**filters)
        return self.session.exec(statement).first()

    def find_all_sync(self) -> List[T]:
        """
        Retrieve all aggregate roots.

        Returns:
            List[T]: A list containing all aggregate roots.

        Note:
            This is a blocking method.
        """
        statement = select(self.aggregate_root)
        return list(self.session.exec(statement))

    def find_ids_sync(self) -> List[str]:
        """
        Retrieve the IDs of all aggregate roots.

        Returns:
            List[str]: A list containing all aggregate root IDs.

        Note:
            This is a blocking method.
        """
        statement = select(self.aggregate_root.id)
        return [row[0] for row in self.session.exec(statement).all()]

    def save_sync(self, aggregate_root: T) -> None:
        """
        Save an aggregate root to the repository.

        Args:
            aggregate_root (T): The aggregate root to persist.

        Note:
            This is a blocking method.
        """
        self.session.add(aggregate_root)
        self.session.commit()
        self.session.refresh(aggregate_root)
